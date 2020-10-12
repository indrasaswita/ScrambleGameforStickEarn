
from twl06 import _Dawg, check
import sys

arr = sys.argv[1].split(',')
result = ''
for text in arr:
	if check(text) == True:
		if len(result) != 0:
			result = result+"#"
		result = result+text


print(result)