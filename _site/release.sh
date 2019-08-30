TAG=v$(date +%d%b%y-%H%M)
git tag -a $TAG -m "$TAG"
git push --tags


