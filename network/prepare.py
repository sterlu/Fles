import re
import sys

input_file = open(sys.argv[1], "r")
output_file = open(sys.argv[1] + ".prepared", "w")

filter = re.compile(r'(^|[^\w])(sunčano|kiša|oblačno|toplo|stepena|stepen|kišom|hladno|hladnije|stepeni|obilne padavine|toplije|sneg|ubije|ubil|poginu|silova|prebil|umrl|umro|preminu|mrtvi|dečak|devojčic|dete)', flags=re.I | re.M)

skipped_first = False
for line in input_file:
    if not skipped_first:
        skipped_first = True
        continue

    if filter.search(line):
        continue

    line = line.replace('ž', 'ž').replace('š', 'š').replace('&quot;', '"').replace('&amp;', '&')
    line = re.sub(r'^(")*', '', line)
    line = re.sub(r'(")*$', '', line)
    line = line.replace('– ', ' ') \
        .replace('- ', ' ') \
        .replace(':', ' ')

    line = line.replace('(KURIR TV)', '(VIDEO)').replace('KURIR TV', '')
    re.sub('za (kurir|blic)', 'za Fleš', line, flags=re.I)
    re.sub('uz (kurir|blic)', 'uz Fleš', line, flags=re.I)
    re.sub(' (kurir|blic) vam ', ' Fleš vam ', line, flags=re.I)
    re.sub('KURIR HOROSKOP', 'HOROSKOP', line, flags=re.I)

    output_file.write(line.strip() + '\n')

input_file.close()
output_file.close()
