import characterData from "../../data/characterData.json";

// Character data files are named e.g. "01_mario.json", "04e_dark-samus.json" - the leading
// digit distinguishes them from the other JSON files that live alongside them in data/
// (characterData.json, items.json, todo.json).
const characterModules = import.meta.glob("../../data/[0-9]*.json", {
  eager: true,
}) as Record<string, { default: any }>;

const characters: Record<string, any> = {};

Object.values(characterModules).forEach(({ default: data }) => {
  characters[`${data.number}_${data.value}`] = data;
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
