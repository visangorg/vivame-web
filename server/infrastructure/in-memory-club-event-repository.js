export function createInMemoryClubEventRepository(seed = []) {
  let events = Array.isArray(seed) ? seed.map((ev) => ({ ...ev })) : [];

  return {
    async list() {
      return events.map((ev) => ({ ...ev }));
    },
    async saveAll(next) {
      events = Array.isArray(next) ? next.map((ev) => ({ ...ev })) : [];
    },
  };
}
