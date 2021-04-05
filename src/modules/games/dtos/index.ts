interface ICreateGameDTO {
  title: string;
}

interface IAddGameDTO {
  title: string;
  email: string;
}

interface IFindGameDTO {
  title: string;
}

interface IFindIDGameDTO {
  game_id: string;
}

export { IAddGameDTO, IFindIDGameDTO, IFindGameDTO, ICreateGameDTO };
