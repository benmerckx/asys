#!/bin/sh
zip -r asys.zip asys haxelib.json README.md -x "*/\.*"
haxelib submit asys.zip
rm asys.zip 2> /dev/null