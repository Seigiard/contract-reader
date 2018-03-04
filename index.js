const fs = require('fs');
const Documents = require('google-documents-api');
const Europa = require('node-europa');
const Showdown = require('showdown');
const sanitizeHtml = require('sanitize-html');
const express = require('express');

const documentId = '1j8AhHyqKhDkM0vlzwK-4sK4M7MEiCGqdp4uF4ciGbzc';
const serviceEmail = 'reader@contracts-reader.iam.gserviceaccount.com';
const serviceKey = fs.readFileSync('./sheets.pem').toString();

const docs = new Documents({
    email: serviceEmail,
    key: serviceKey
});

var myext = {
    type: 'lang', //output
    filter: function (text, converter) {
        return text.replace(/(\\_)+/g, str => {
            return `<span contentEditable='true' style='width:${str.length/2*.5}em; display:inline-block; border-bottom:1px solid #aaa;'></span>`;
        });
    }
  };
Showdown.extension('myext', myext);

const app = express();
const htmlToMd = new Europa();
const mdToHtml = new Showdown.Converter({ extensions: ['myext'] });

const clearDoc = doc => sanitizeHtml(doc, {
    allowedTags: ['p', 'ul', 'li', 'h1', 'h2', 'h6'],
    transformTags: {
        'p': (tagName, attribs) => {
            if (attribs.class && attribs.class.indexOf('title') > -1) {
                const tagName = attribs.class.indexOf('subtitle') > -1 ? 'h6' : 'h1';
                return {
                    tagName,
                };
            }
            return {
                tagName: 'p',
            };
        },
    }
})

const convertToClearHtml = doc => mdToHtml.makeHtml(htmlToMd.convert(doc));

const getDocument = () => docs.getDocumentHtml(documentId)
    .then(clearDoc)
    .catch(function (err) {
        console.error(err, 'Failed to read document');
    });

app.get('/', (req, res) => {
    getDocument()
        .then(htmlContent => {
            res.set('Content-Type', 'text/html; charset=utf-8');
            res.send(htmlContent);
        });
});
app.get('/md', (req, res) => {
    getDocument()
        .then(doc => htmlToMd.convert(doc))
        .then(content => {
            res.set('Content-Type', 'text/markdown; charset=utf-8');
            res.send(content);
        });
});
app.get('/md2html', (req, res) => {
    getDocument()
        .then(doc => htmlToMd.convert(doc))
        .then(doc => mdToHtml.makeHtml(doc))
        .then(content => {
            res.set('Content-Type', 'text/html; charset=utf-8');
            res.send(content);
        });
});

app.listen(3000);