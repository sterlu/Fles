import re
import sys

input_file = open(sys.argv[1], "r")
output_file = open(sys.argv[1] + ".prepared", "w")

skipped_first = False
for line in input_file:
    if not skipped_first:
        skipped_first = True
        continue

    if "sunčano" in line.lower() or "kiša" in line.lower() or "oblačno" in line.lower() or "toplo" in line.lower() or "stepena" in line.lower() \
            or "stepen" in line.lower() or "kišom" in line.lower() or "hladno" in line.lower() or "hladnije" in line.lower() or "stepeni" in line.lower() \
            or "obilne padavine" in line.lower() or "toplije" in line.lower() or "sneg" in line.lower():
        continue

    if " ubije" in line.lower() or " ubil" in line.lower() or "pogin" in line.lower() or "silovan" in line.lower() or " prebil" in line.lower():
        continue

    line = line.replace('ž', 'ž').replace('š', 'š').replace('&quot;', '"').replace('&amp;', '&')
    line = re.sub(r'^(")*', '', line)
    line = re.sub(r'(")*$', '', line)
    line = line.replace('– ', '') \
        .replace('- ', '') \
        .replace(':', '')

    output_file.write(line.strip() + '\n')

input_file.close()
output_file.close()
