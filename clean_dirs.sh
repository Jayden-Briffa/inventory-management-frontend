#!/usr/bin/env bash

set -euo pipefail

targets=("Yara" "George" "jayden")

for dir in "${targets[@]}"; do
	echo "Processing $dir..."

	for subdir in ".git" "node_modules"; do
		path="$dir/$subdir"

		if [[ -d "$path" ]]; then
			rm -rf "$path"
			echo "  Removed $path"
		else
			echo "  Skipped $path (not found)"
		fi
	done
done

echo "Cleanup complete."
