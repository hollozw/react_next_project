import { Dispatch, SetStateAction } from "react";

export type TSetState<T> = Dispatch<SetStateAction<T>>;

export type TSortebleProps = NodeListOf<HTMLElement>;

export interface IUploadFileParm {
  dir?: string;
  file?: File;
}

export type TGetFIleDataIndex = (eLementList: HTMLElement[]) => number[];
