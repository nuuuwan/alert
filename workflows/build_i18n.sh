cd "$DIR_PY/i18n_apps"
python3 workflows/build_data.py "$DIR_JS_REACT/alert/src/i18n"
cd "$DIR_JS_REACT/alert"
git add src/i18n/*
git commit -m "🤖 chore: update i18n files"    