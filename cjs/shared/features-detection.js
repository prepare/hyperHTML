'use strict';
const {create, fragment, text} = require('./easy-dom.js');

const testFragment = fragment(document);

// DOM4 node.append(...many)
const hasAppend = 'append' in testFragment;
exports.hasAppend = hasAppend;

// beside IE, old WebKit browsers don't have `children` in DocumentFragment
const hasChildren = 'children' in testFragment;
exports.hasChildren = hasChildren;

// detect old browsers without HTMLTemplateElement content support
const hasContent = 'content' in create(document, 'template');
exports.hasContent = hasContent;

// If attributes order is shuffled, threat the browser differently
// Usually this is a well known IE/Edge only issue but some older FF does the same.
const p = create(document, 'p');
p.innerHTML = '<i data-i="" class=""></i>';
const hasDoomedAttributes = /class/i.test(p.firstChild.attributes[0].name);
exports.hasDoomedAttributes = hasDoomedAttributes;

// IE 11 has problems with cloning templates: it "forgets" empty childNodes
testFragment.appendChild(text(testFragment, 'g'));
testFragment.appendChild(text(testFragment, ''));
const hasDoomedCloneNode = testFragment.cloneNode(true).childNodes.length === 1;
exports.hasDoomedCloneNode = hasDoomedCloneNode;

// old browsers need to fallback to cloneNode
// Custom Elements V0 and V1 will work polyfilled
const hasImportNode = 'importNode' in document;
exports.hasImportNode = hasImportNode;
