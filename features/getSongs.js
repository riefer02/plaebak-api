async function getSongs() {
  // ... you will write your Prisma Client queries here
  return await prisma.songs.findMany();
}

module.exports = getSongs;
