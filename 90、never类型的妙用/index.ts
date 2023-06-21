// TypeScript中never类型到底有什么用？
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

function request(method: Method, url: string) {
  switch (method) {
    case 'GET':
      return 'GET';
    case 'POST':
      return 'POST';
    default:
      const n:never = method;
      return n;
  }
}