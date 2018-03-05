# Clustd Shell Driver

A simple driver that executes a start and stop script. This can be used to do virtually anything to a system through shell scripts.

## Configuration

```yml
host: ws://127.0.0.1:3001
secret: 'cluster secret'
script:
  shell: /bin/bash
  cwd: .
  start: ./start.sh
  stop: ./stop.sh
  env:
    MY_VAR: 2
```

## clustd

Find the other projects below to get started and for more information.

- clustd daemon: https://github.com/steemdunk/clustd
- clustd library: https://github.com/steemdunk/clustd-lib
