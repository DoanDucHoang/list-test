export interface IBanner { 
    id: string;
    bannerGroup: string;
    order: number;
    bannerName: string;
    link: string;
    text: IText[];
    date: string;
    image: string;
    status: string;
}

export const convertFile = (files: FileList | null) => { 
    if (files) { 
      const fileRef = files[0] || ""
      const fileType: string = fileRef.type || ""
      const reader = new FileReader()
      reader.readAsBinaryString(fileRef)
      reader.onload=(ev: any) => {
          // convert it to base64
          const data = `data:${fileType};base64,${btoa(ev.target.result)}`
          return data;
      }
    }
  }

export interface IText {
    id : number;
    value : string;
}

export const dummyTextList: IText[] = [
    {
        id: 0,
        value: "text 1"
    }
]

export enum PageEnum { 
    list,
    add,
    edit
}