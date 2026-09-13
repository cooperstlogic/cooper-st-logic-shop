/**
 * Content Validation Script
 * 
 * Ensures content doesn't exceed the fixed paper dimensions (800px height).
 * Run this as part of the build process to catch content overflow issues.
 * 
 * Usage: node validate-content.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const MAX_PAGE_HEIGHT = 800; // pixels
const PADDING = 4 * 16; // 4rem top + 4rem bottom in pixels (assuming 16px base)
const HEADER_HEIGHT = 100; // Approximate header height in pixels
const USABLE_HEIGHT = MAX_PAGE_HEIGHT - (PADDING * 2) - HEADER_HEIGHT;

// Approximate height calculations (rough estimates)
const LINE_HEIGHT = 24; // pixels
const PARAGRAPH_SPACING = 16; // pixels
const H1_HEIGHT = 48;
const H2_HEIGHT = 36;
const H3_HEIGHT = 28;
const HR_HEIGHT = 32;

/**
 * Parse markdown content and estimate rendered height
 */
function estimateContentHeight(markdownContent) {
  let height = 0;
  const lines = markdownContent.split('\n');
  
  let inFrontMatter = false;
  let skipFrontMatter = false;
  let inComment = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Handle front matter
    if (line === '---') {
      if (i === 0) {
        inFrontMatter = true;
        skipFrontMatter = true;
        continue;
      } else if (inFrontMatter) {
        inFrontMatter = false;
        skipFrontMatter = false;
        continue;
      }
    }
    
    if (skipFrontMatter && inFrontMatter) {
      continue;
    }
    
    // Skip empty lines (but count spacing for consecutive content)
    if (line === '') {
      continue;
    }
    
    // HTML comments render nothing. Track them across lines so a wrapped
    // comment is not counted as several paragraphs.
    if (inComment) {
      if (line.includes('-->')) inComment = false;
      continue;
    }
    if (line.startsWith('<!--')) {
      if (!line.includes('-->')) inComment = true;
      continue;
    }

    // Count different elements
    if (line.startsWith('# ')) {
      height += H1_HEIGHT;
    } else if (line.startsWith('## ')) {
      height += H2_HEIGHT;
    } else if (line.startsWith('### ')) {
      height += H3_HEIGHT;
    } else if (line.startsWith('<hr') || line.startsWith('---') && line.length >= 3) {
      height += HR_HEIGHT;
    } else if (line.length > 0) {
      // Inline HTML is layout, not prose: measure the text a line carries,
      // not its markup. A line that is only tags (<ul class="...">, </ul>)
      // takes no line of its own.
      const text = line.replace(/<[^>]*>/g, '').trim();
      if (text.length === 0) continue;

      // Estimate paragraph height based on line length
      // Assuming ~80 characters per line at typical font size
      const estimatedLines = Math.ceil(text.length / 80);
      height += (estimatedLines * LINE_HEIGHT) + PARAGRAPH_SPACING;
    }
  }
  
  return height;
}

/**
 * Validate all markdown files in src directory
 */
function validateContentFiles() {
  const srcDir = path.join(__dirname, 'src');
  const errors = [];
  const warnings = [];
  
  // Find all .md files
  const files = fs.readdirSync(srcDir)
    .filter(file => file.endsWith('.md'))
    .map(file => path.join(srcDir, file));
  
  files.forEach(filePath => {
    const fileName = path.basename(filePath);
    const content = fs.readFileSync(filePath, 'utf-8');
    const estimatedHeight = estimateContentHeight(content);
    
    console.log(`\nChecking ${fileName}:`);
    console.log(`  Estimated height: ${estimatedHeight}px`);
    console.log(`  Usable height: ${USABLE_HEIGHT}px`);
    
    if (estimatedHeight > USABLE_HEIGHT) {
      const overflow = estimatedHeight - USABLE_HEIGHT;
      errors.push({
        file: fileName,
        height: estimatedHeight,
        overflow: overflow
      });
      console.log(`  ❌ OVERFLOW: Content exceeds page by ${overflow}px`);
    } else if (estimatedHeight > USABLE_HEIGHT * 0.9) {
      const remaining = USABLE_HEIGHT - estimatedHeight;
      warnings.push({
        file: fileName,
        height: estimatedHeight,
        remaining: remaining
      });
      console.log(`  ⚠️  WARNING: Only ${remaining}px remaining (90% full)`);
    } else {
      console.log(`  ✅ OK: Content fits within page bounds`);
    }
  });
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('VALIDATION SUMMARY');
  console.log('='.repeat(60));
  
  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ All content files are within page bounds!');
    return 0;
  }
  
  if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
    warnings.forEach(w => {
      console.log(`  ${w.file}: ${w.remaining}px space remaining`);
    });
  }
  
  if (errors.length > 0) {
    console.log('\n❌ ERRORS:');
    errors.forEach(e => {
      console.log(`  ${e.file}: ${e.overflow}px overflow`);
    });
    console.log('\n💡 Fix: Reduce content or split across multiple pages');
    return 1;
  }
  
  return 0;
}

// Run validation
try {
  const exitCode = validateContentFiles();
  process.exit(exitCode);
} catch (error) {
  console.error('Error during validation:', error);
  process.exit(1);
}
