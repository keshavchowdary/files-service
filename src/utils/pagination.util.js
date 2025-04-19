function paginate({ page = 1, pageSize = 10 }) {
  const skip = (page - 1) * pageSize;
  return { skip, limit: pageSize };
}

module.exports = { paginate };
