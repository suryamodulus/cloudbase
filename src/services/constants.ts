export enum ServiceStatusEnum {
  QUEUED = 'queued',
  PULLING_IMAGE = 'pulling_image',
  RUNNING = 'running',
  STOPPED = 'stopped',
  ERRORED = 'errored',
}

export enum ServiceTypeEnum {
  PUBLIC = 'public',
  PRIVATE = 'private',
}
