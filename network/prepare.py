import re

input_file = open("summaries.txt", "r")
output_file = open("summaries.prepared.txt", "w")

skipped_first = False
for line in input_file:
    if not skipped_first:
        skipped_first = True
        continue

    line = line.replace('ž', 'ž').replace('š', 'š').replace('&quot;', '"').replace('&amp;', '&')
    line = re.sub(r'^(")*', '', line)
    line = re.sub(r'(")*$', '', line)

    output_file.write(line.strip() + '\n')

input_file.close()
output_file.close()
