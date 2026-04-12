import { TFunction } from 'i18next';

export const getServicesList = (t: TFunction) => [
  {
    id: 'cosmetic-dentistry',
    title: t('services.cosmeticTitle'),
    description: t('services.cosmeticDesc'),
    longDescription: t('serviceDetails.cosmetic-dentistry.longDescription'),
    image: 'https://i.postimg.cc/m2328F2Y/Chat-GPT-Image-Mar-2-2026-03-46-34-PM.png',
    services: [
      { id: 'porcelain-crowns', key: 'porcelain-crowns', image: 'https://i.postimg.cc/BbgYg3yM/Chat-GPT-Image-Mar-3-2026-05-42-31-PM.png' },
      { id: 'porcelain-veneers', key: 'porcelain-veneers', image: 'https://i.postimg.cc/m2328F2Y/Chat-GPT-Image-Mar-2-2026-03-46-34-PM.png' },
      { id: 'composite-veneers', key: 'composite-veneers', image: 'https://i.postimg.cc/LstzfTGx/Chat-GPT-Image-Mar-3-2026-05-47-31-PM.png' },
      { id: 'teeth-whitening', key: 'teeth-whitening', image: 'https://i.postimg.cc/mk1Gnj1r/zoom-teeth-whitening.jpg' },
      { id: 'smile-design', key: 'smile-design', image: 'https://i.postimg.cc/63xMxTxD/Chat-GPT-Image-Mar-2-2026-04-37-36-PM.png' }
    ],
    buttonText: t('services.cosmeticBtn')
  },
  {
    id: 'general-dentistry',
    title: t('services.generalTitle'),
    description: t('services.generalDesc'),
    longDescription: t('serviceDetails.general-dentistry.longDescription'),
    image: 'https://i.postimg.cc/mk2vLKDh/pexels-nadezhda-moryak-7800679.jpg',
    services: [
      { id: 'routine-cleanings', key: 'routine-cleanings', image: 'https://i.postimg.cc/Zqs2h3Sn/Chat-GPT-Image-Mar-2-2026-06-33-08-PM.png' },
      { id: 'digital-xrays', key: 'digital-xrays', image: 'https://i.postimg.cc/rs1mZnCB/Chat-GPT-Image-Mar-3-2026-05-54-42-PM.png' },
      { id: 'fillings', key: 'fillings', image: 'https://i.postimg.cc/Vsqk8hnZ/Chat-GPT-Image-Mar-3-2026-05-57-10-PM.png' },
      { id: 'night-guards', key: 'night-guards', image: 'https://i.postimg.cc/MHC7VFZ0/Chat-GPT-Image-Mar-3-2026-06-05-36-PM.png' },
      { id: 'tooth-extractions', key: 'tooth-extractions', image: 'https://i.postimg.cc/fWpv7b8D/Chat-GPT-Image-Mar-3-2026-06-07-46-PM.png' },
      { id: 'sealants', key: 'sealants', image: 'https://i.postimg.cc/VNhSyJry/Chat-GPT-Image-Mar-3-2026-06-12-24-PM.png' }
    ],
    buttonText: t('services.generalBtn')
  },
  {
    id: 'orthodontics',
    title: t('services.orthoTitle'),
    description: t('services.orthoDesc'),
    longDescription: t('serviceDetails.orthodontics.longDescription'),
    image: 'https://i.postimg.cc/DZqzWC0X/Chat-GPT-Image-Mar-2-2026-04-26-32-PM.png',
    services: [
      { id: 'invisalign', key: 'invisalign', image: 'https://i.postimg.cc/DZqzWC0X/Chat-GPT-Image-Mar-2-2026-04-26-32-PM.png' },
      { id: 'porcelain-braces', key: 'porcelain-braces', image: 'https://i.postimg.cc/kXZW8Mv7/porcelane-braces.jpg' },
      { id: 'metal-braces', key: 'metal-braces', image: 'https://i.postimg.cc/ZRTNZW4X/metal-braces.jpg' },
      { id: 'retainers', key: 'retainers', image: 'https://i.postimg.cc/KvKMZShy/dental-retainers.jpg' }
    ],
    buttonText: t('services.orthoBtn')
  },
  {
    id: 'implants',
    title: t('services.implantsTitle'),
    description: t('services.implantsDesc'),
    longDescription: t('serviceDetails.implants.longDescription'),
    image: 'https://i.postimg.cc/9MMh2JTf/Chat-GPT-Image-Mar-2-2026-04-40-00-PM.png',
    services: [
      { id: 'single-tooth', key: 'single-tooth', image: 'https://i.postimg.cc/9MMh2JTf/Chat-GPT-Image-Mar-2-2026-04-40-00-PM.png' },
      { id: 'all-on-4', key: 'all-on-4', image: 'https://i.postimg.cc/JzxGgxM8/all-on-4.jpg' }
    ],
    buttonText: t('services.implantsBtn')
  },
  {
    id: 'endodontics',
    title: t('services.endoTitle'),
    description: t('services.endoDesc'),
    longDescription: t('serviceDetails.endodontics.longDescription'),
    image: 'https://i.postimg.cc/HW6vYDzL/root-canal.jpg',
    services: [
      { id: 'root-canal', key: 'root-canal', image: 'https://i.postimg.cc/HW6vYDzL/root-canal.jpg' },
      { id: 'pulpoctomy', key: 'pulpoctomy', image: 'https://i.postimg.cc/MK8L3b91/pexels-semih-demirbas-475034547-16143351.jpg' },
      { id: 'endodontic-retreatment', key: 'endodontic-retreatment', image: 'https://i.postimg.cc/GtnXNdxy/pexels-polina-zimmerman-4687404.jpg' }
    ],
    buttonText: t('services.endoBtn')
  },
  {
    id: 'surgical',
    title: t('services.surgicalTitle'),
    description: t('services.surgicalDesc'),
    longDescription: t('serviceDetails.surgical.longDescription'),
    image: 'https://i.postimg.cc/gJfGTSjG/wisdom-tooth-extraction.jpg',
    services: [
      { id: 'wisdom-teeth', key: 'wisdom-teeth', image: 'https://i.postimg.cc/gJfGTSjG/wisdom-tooth-extraction.jpg' },
      { id: 'sinus-lifts', key: 'sinus-lifts', image: 'https://i.postimg.cc/G37FHvfq/sinus-lift.jpg' },
      { id: 'bone-grafting', key: 'bone-grafting', image: 'https://i.postimg.cc/Bnct106n/bonegraft.jpg' },
      { id: 'oral-biopsies', key: 'oral-biopsies', image: 'https://i.postimg.cc/K8v1XYF0/oral-biopsy.jpg' }
    ],
    buttonText: t('services.surgicalBtn')
  },
  {
    id: 'periodontics',
    title: t('services.perioTitle'),
    description: t('services.perioDesc'),
    longDescription: t('serviceDetails.periodontics.longDescription'),
    image: 'https://i.postimg.cc/W41YJ0VS/pexels-shvetsa-3845682.jpg',
    services: [
      { id: 'scaling-root-planing', key: 'scaling-root-planing', image: 'https://i.postimg.cc/fycfPbZC/Chat-GPT-Image-Mar-2-2026-06-33-08-PM.png' },
      { id: 'gum-grafting', key: 'gum-grafting', image: 'https://i.postimg.cc/sDp3nCWy/gum-grafting.jpg' },
      { id: 'laser-gum', key: 'laser-gum', image: 'https://i.postimg.cc/PJjRJ95w/laser-gum.jpg' }
    ],
    buttonText: t('services.perioBtn')
  },
  {
    id: 'facial-esthetics',
    title: t('services.facialTitle'),
    description: t('services.facialDesc'),
    longDescription: t('serviceDetails.facial-esthetics.longDescription'),
    image: 'https://i.postimg.cc/X7cZzPYX/Chat-GPT-Image-Mar-2-2026-01-03-09-PM.png',
    services: [
      { id: 'wrinkle-relaxers', key: 'wrinkleRelaxers', image: 'https://i.postimg.cc/X7cZzPYX/Chat-GPT-Image-Mar-2-2026-01-03-09-PM.png' },
      { id: 'dermal-fillers', key: 'dermal-fillers', image: 'https://i.postimg.cc/pdypyXYT/Chat-GPT-Image-Mar-2-2026-01-03-15-PM.png' },
      { id: 'collagen-stimulators', key: 'collagen-stimulators', image: 'https://i.postimg.cc/G3B3D5yf/FEDEF8FC-4320-453C-8F9D-40DA3F56DA25.png' }
    ],
    buttonText: t('services.facialBtn')
  }
];
