#!/bin/sh

npm run build
del -rf C:/Users/Niko/Part3.1/build
xcopy C:/Users/Niko/part2.2 C:/Users/Niko/Part3.1 /O /X /E /H /K
