FROM python:3.9-bullseye

ADD . /app
WORKDIR /app
COPY ./ /app

RUN python3 -m pip install --upgrade pip
RUN pip install --no-cache-dir -r dev-requirements.txt # ou requirements se estiver em produção

CMD ["python", "swapi/main.py"]