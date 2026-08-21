const characterData = require("../../../server/data/characterData.json");
const characterFiles = require.context(
  "../../../server/data",
  false,
  /^\.\/\d+.*\.json$/,
);

const characters = {};

characterFiles.keys().forEach((fileName) => {
  const character = characterFiles(fileName);
  characters[`${character.number}_${character.value}`] = character;
});

export function getCharacterList() {
  return characterData;
}

export function getCharacterData(character) {
  const data = characters[character];

  if (!data) {
    return undefined;
  }

  return {
    ...data,
    moves: data.moves.map(({ name, value, complete }) => ({
      name,
      value,
      complete,
    })),
  };
}

export function getMoveData(character, move) {
  const data = characters[character];
  return (
    data &&
    data.moves.find((item) => item.value.toLowerCase() === move.toLowerCase())
  );
}
