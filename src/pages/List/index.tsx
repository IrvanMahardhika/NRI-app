import React, { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { CircularProgress } from '@mui/material';

import { GetAlbumResponseData, GetPhotoResponseData } from 'types/api';

import { getAlbumList, getPhotoList } from 'api/pics';

import styles from './List.module.scss';

import UserProfile from './UserProfile/index';

const DUMMY_FOOD_PIC = [
  'https://asset.kompas.com/crops/1g9P4L73NLmOshdRUptmBe_oQgQ=/0x0:698x465/750x500/data/photo/2020/12/07/5fce3837c4f6d.jpg',
  'https://img.inews.co.id/media/1200/files/inews_new/2023/07/13/Asinan_Bogor.jpg',
  'https://asset.kompas.com/crops/2sjLUUCqOhsi36M0pxYbbqz7vtM=/100x67:900x600/750x500/data/photo/2021/01/01/5fee5925f248d.jpg',
  'https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/08/08050853/Catat-Ini-Resep-Fu-Yung-Hai-Ala-Restoran-yang-Mudah-Dibuat-di-Rumah.jpg.webp',
  'https://media-cdn.tripadvisor.com/media/photo-s/19/1e/1a/3a/pizza-hut.jpg',
  'https://img.kurio.network/ewrCJ9eRNpljU-80vrqWDQkN7o4=/1200x675/filters:quality(80)/https://kurio-img.kurioapps.com/20/10/10/a7e9eaa0-1c22-42b0-a11f-0a5ad1d30126.jpeg',
  'https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/indizone/2021/06/08/d5soNZP/begini-loh-cara-mudah-membuat-sapo-tahu-seafood-yang-lezat68.jpg',
  'https://img-global.cpcdn.com/recipes/8c04c4d631182e4f/1200x630cq70/photo.jpg',
  'https://asset-2.tstatic.net/jambi/foto/bank/images/resep-ayam-goreng-mentega.jpg',
  'https://img.okezone.com/content/2016/01/05/298/1281159/santap-malam-enaknya-makan-ifumie-kuah-hangat-pqoGG1tMuX.jpg'
];

const List: React.FC = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<number>();
  const [albumList, setAlbumList] = useState<GetAlbumResponseData>([]);
  const [photoList, setPhotoList] = useState<GetPhotoResponseData>([]);
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fn = async () => {
      try {
        setLoading(true);
        const res = await getAlbumList();
        if (res && res.data && res.data.length > 0) {
          setAlbumList(res.data.slice(0, 10));
          setSelectedAlbum(res.data[0].id);
        }
      } catch (e) {
        const error = e as AxiosError;
        setError(JSON.stringify(error?.response?.data));
      } finally {
        setLoading(false);
      }
    };
    fn();
  }, []);

  useEffect(() => {
    const fn = async () => {
      if (!selectedAlbum) {
        return;
      }
      try {
        setLoading(true);
        const res = await getPhotoList({ albumId: selectedAlbum });
        if (res && res.data && res.data.length > 0) {
          setPhotoList(res.data);
        }
      } catch (e) {
        const error = e as AxiosError;
        setError(JSON.stringify(error?.response?.data));
      } finally {
        setLoading(false);
      }
    };
    fn();
  }, [selectedAlbum]);

  return (
    <div className={styles.list}>
      {error && (
        <div className={styles.errorWrapper}>
          <div className={styles.error}>{error}</div>
        </div>
      )}
      <UserProfile />
      <div className={styles.carouselContainer}>
        {albumList.map((d, i) => {
          return (
            <div
              key={i.toString()}
              className={
                selectedAlbum === d.id
                  ? styles.activeCarouselImgContainer
                  : styles.carouselImgContainer
              }
              onClick={() => setSelectedAlbum(d.id)}
            >
              <img
                className={styles.carouselImg}
                src={DUMMY_FOOD_PIC[i]}
                alt="img"
              />
              {selectedAlbum === d.id && (
                <span className={styles.albumTitleText}>{d.title}</span>
              )}
            </div>
          );
        })}
      </div>
      {loading && (
        <div id="loader" className={styles.loaderWrapper}>
          <CircularProgress size={50} className={styles.loader} />
        </div>
      )}
      {photoList && photoList.length > 0 && (
        <div className={styles.col}>
          <div className={styles.firstCol}>
            {photoList.map((d, i) => {
              const isEven = i % 2 === 0;

              if (isEven) {
                return (
                  <div key={i.toString()} className={styles.shortImgContainer}>
                    <img
                      className={styles.img}
                      src={d.thumbnailUrl}
                      alt="img"
                    />
                  </div>
                );
              } else {
                return (
                  <div key={i.toString()} className={styles.tallImgContainer}>
                    <img
                      className={styles.img}
                      src={d.thumbnailUrl}
                      alt="img"
                    />
                  </div>
                );
              }
            })}
          </div>
          <div className={styles.secondCol}>
            {photoList.map((d, i) => {
              const isEven = i % 2 === 0;

              if (!isEven) {
                return (
                  <div key={i.toString()} className={styles.shortImgContainer}>
                    <img
                      className={styles.img}
                      src={d.thumbnailUrl}
                      alt="img"
                    />
                  </div>
                );
              } else {
                return (
                  <div key={i.toString()} className={styles.tallImgContainer}>
                    <img
                      className={styles.img}
                      src={d.thumbnailUrl}
                      alt="img"
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
