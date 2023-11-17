import { GetAlbumResponseData, GetPhotoResponseData } from 'types/api';
import request from './request';

export const getAlbumList = () => request.get<GetAlbumResponseData>('/albums');

export const getPhotoList = ({ albumId }: { albumId: number }) =>
  request.get<GetPhotoResponseData>(`/photos?albumId=${albumId}`);
