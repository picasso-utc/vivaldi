git fetch
git reset --hard origin/develop
npm run build-dev
cp .htaccess ./build/