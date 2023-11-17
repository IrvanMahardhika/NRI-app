export interface Album {
  userId: string;
  id: number;
  title: string;
}

export type GetAlbumResponseData = Array<Album>;

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export type GetPhotoResponseData = Array<Photo>;
