const resolvePromiseSettled = <T>(result: PromiseSettledResult<T>): T | null => {
  return result.status === 'fulfilled' ? result.value : null
}

export default resolvePromiseSettled
