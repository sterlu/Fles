import re

input_file = open("input.txt", "r")
output_file = open("input.prepared.txt", "w")

skipped_first = False
for line in input_file:
    if not skipped_first:
        skipped_first = True
        continue

    line = re.sub(r'^"', '', line)
    line = re.sub(r'"$', '', line)

    output_file.write(line.strip() + '\n')

input_file.close()
output_file.close()
