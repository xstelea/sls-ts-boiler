export default {
  someKey: _('SOME_ENV', 'defaultValue'),
};

function _(key: string, defaultValue?: string) {
  return process.env[key] || defaultValue;
}
