# rm -R -f ./migrations && #NO QUITAR COMENTARIO
# pipenv run init &&  #NO QUITAR COMENTARIO
dropdb -h localhost -U gitpod example || true &&
createdb -h localhost -U gitpod example || true &&
psql -h localhost example -U gitpod -c 'CREATE EXTENSION unaccent;' || true &&
pipenv run migrate &&
pipenv run upgrade


#reset borra el hilo