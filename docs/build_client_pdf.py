# -*- coding: utf-8 -*-
import os, sys, re, subprocess

md_path = r'D:\Nirt\NIRT_Solar_CRM_Client_Documentation.md'
html_path = r'D:\Nirt\client_doc.html'
pdf_path = r'D:\Nirt\NIRT_Solar_CRM_Client_Documentation.pdf'
chrome_exe = r'C:\Program Files\Google\Chrome\Application\chrome.exe'

with open(md_path, 'r', encoding='utf-8') as f:
    raw_md = f.read()

# Let's inspect sections
print('Read', len(raw_md), 'chars from', md_path)
