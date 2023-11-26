import { ProvinceEnum } from "./ProvinceEnum"

export enum InstitutionType {
    MINISTRY = "Kementerian",
    PEMDA = "Pemerintah Daerah",
    LSM = "Yayasan / Lembaga Swadaya Masyarakat",
    EDU = "Institusi Pendidikan",
    BUSINESS = "Dunia Usaha",
    MEDIA = "Media",
    PUBLIC = "Masyarakat Terdampak"
}

export const InstitutionTypeMap = {
    [InstitutionType.MINISTRY] : [
        "Kemenko PMK RI",
        "Kementerian Kesehatan RI",
        "Kementerian Dalam Negeri",
        "Kementerian Ketenagakerjaan",
        "Kementerian Desa PDTT",
        "Kementerian Komunikasi dan Informatika",
        "Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi",
    ],
    [InstitutionType.PEMDA] : [
        "Dinas Kesehatan Provinsi",
        "Dinas Kesehatan Kabupaten/Kota",
        "Dinas Pendidikan Provinsi",
        "Dinas Pendidikan Kabupaten/Kota",
        "Dinas Komunikasi dan Informatika Provinsi",
        "Dinas Komunikasi dan Informatika Kabupaten/Kota",
        "Badan Perencanaan Daerah",
        "Humas/Protokoler Pemerintah Provinsi",
    ],
    [InstitutionType.LSM] : [
        "SR Sumatera Barat",
        "Yayasan Inisiatif Lampung Sehat",
        "Masyarakat Sehat Sriwijaya",
        "PKBI Riau",
        "SR DKI Jakarta",
        "SR Banten",
        "SR Konsorisium Penabulu Jawa Barat",
        "Mentari Sehat Indonesia",
        "Yayasab Bhanu Yasa Sejahtera",
        "Yayasan Bina Asri",
        "Yayasan Masyarakat Peduli TBC Sulawesi Selatan",
    ],
    [InstitutionType.EDU] : {
        [ProvinceEnum.northSumatera] : [
            "Universitas Sumatera Utara",
            "Universitas Muhammadiyah Sumatera Utara",
        ],
        [ProvinceEnum.westSumatera] : [
            "Universitas Andalas",
            "Universitas Negeri Padang",
            "Universitas Muhammadiyah Sumatera Barat",
        ],
        [ProvinceEnum.riau] : [
            "Universitas Riau",
            "Universitas Muhammadiyah Riau",
        ],
        [ProvinceEnum.southSumatera] : [
            "Universitas Sriwijaya",
            "Universitas Muhammadiyah Palembang",
        ],
        [ProvinceEnum.lampung] : [
            "Universitas Lampung",
            "Universitas Bandar Lampung",
        ],
        [ProvinceEnum.banten] : [
            "Universitas Sultan Ageng Tirtayasa",
            "Universitas Muhammadiyah Prof. Dr. Hamka",
        ],
        [ProvinceEnum.jakarta] : [
            "Universitas Negeri Jakarta",
            "Universitas Islam Negeri Syarif Hidayatullah Jakarta",
            "Universitas Paramadina",
            "Universitas Bakrie",
            "Universitas Muhammadiyah Jakarta",
        ],
        [ProvinceEnum.westJava] : [
            "Universitas Indonesia",
            "Institut Pertanian Bogor",
            "Institut Teknologi Bandung",
            "Universitas Padjadjaran",
        ],
        [ProvinceEnum.centralJava] : [
            "Universitas Diponegoro",
            "Universitas Muhammadiyah Semarang",
            "Universitas Muhammadiyah Surakarta",
        ],
        [ProvinceEnum.eastJava] : [
            "Universitas Jember",
            "Universitas Airlangga",
            "Politeknik Negeri Madura",
            "Universitas Negeri Malang",
            "Universitas Islam Negeri Sayyid Ali Rahmatullah Tulungagung",
            "Universitas Ciputra",
        ],
        [ProvinceEnum.westKalimantan] : [
            "Universitas Muhammadiyah Pontianak",
            "Universitas Tanjungpura",
        ],
        [ProvinceEnum.southSulawesi] : [
            "Universitas Islam Negeri Alauddin Makassar",
            "Universitas Hasanuddin",
            "Sekolah Tinggi Ilmu Kesehatan Tamalatea Makassar",
        ],
        [ProvinceEnum.eastKalimantan]: [
            "Universitas Mulawarman",
        ],
        [ProvinceEnum.papua]: [
            "Universitas Cenderawasih",
        ],
        [ProvinceEnum.northSulawesi]: [
            "Universitas Sam Ratulangi",
        ],
    },
    [InstitutionType.BUSINESS] : [
        "Bakrie Sumatera Plantation",
        "Dairi Prima Minerals",
        "Bumi Resources Minerals",
        "PT Otsuka Indah Amerta",
        "Johnson & Johnson",
        "KADIN Indonesia",
        "KADIN Provinsi",
        "Energi Mega Persada",
    ],
    [InstitutionType.MEDIA] : [
        "Kompas",
        "Antara",
        "INews",
        "Viva",
        "ANTV",
        "TVOne",
        "TribunNews",
        "Tempo.co",
        "Media Lokal",
    ],
    [InstitutionType.PUBLIC] : [
        "POP TB Indonesia",
        "PUSAKO Sumbar",
        "Pejuang Tangguh",
        "Sekawan's TB Jember",
        "Rekat Peduli Indonesia",
        "Daeng TB Gowa",
        "Bekantan TB",
    ],
}