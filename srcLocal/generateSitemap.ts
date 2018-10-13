// tslint:disable:no-implicit-dependencies
// tslint:disable:no-console

export const window = {};

import { FirebaseService } from "../src/services/firebaseService";
import * as fs from "fs-extra";
import * as path from "path";
import "firebase/firestore";

const FIREBASE_SERVICE = new FirebaseService();
const FIREBASE_STORE = FIREBASE_SERVICE.getApp().firestore();

const SRC_FOLDER = "./src";
const STATIC_FOLDER_NAME = "static";
const GENERATED_FOLDER_NAME = "generated";
const SITEMAPS_FOLDER_NAME = "sitemaps";
const SITEMAPS_URL_LOCATION = `https://momotabs.com/${SITEMAPS_FOLDER_NAME}/`;
const SITEMAPS_FOLDER = path.join(SRC_FOLDER, STATIC_FOLDER_NAME, GENERATED_FOLDER_NAME, SITEMAPS_FOLDER_NAME);
const SITEMAP_INDEX_FILE_NAME = "sitemap.xml";
const SITEMAP_STATIC_FILE_NAME = "static.sitemap.xml";
const SITEMAP_SONGS_FILE_NAME = "songs.sitemap.xml";
const SITEMAP_INDEX_FILE = path.join(SITEMAPS_FOLDER, SITEMAP_INDEX_FILE_NAME);
const SITEMAP_STATIC_FILE = path.join(SITEMAPS_FOLDER, SITEMAP_STATIC_FILE_NAME);
const SITEMAP_SONGS_FILE = path.join(SITEMAPS_FOLDER, SITEMAP_SONGS_FILE_NAME);

async function execute() {
    await writeSitemapFiles();
    console.log("Finished.");
    process.exit();
}

async function writeSitemapFiles() {
    if (fs.existsSync(SITEMAPS_FOLDER)) {
        fs.removeSync(SITEMAPS_FOLDER);
    }
    fs.mkdirpSync(SITEMAPS_FOLDER);
    fs.writeFileSync(SITEMAP_INDEX_FILE, await getSitemapIndex());
    fs.writeFileSync(SITEMAP_STATIC_FILE, await getSitemapStatic());
    fs.writeFileSync(SITEMAP_SONGS_FILE, await getSitemapSongs());
}

function getSitemapIndex() {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
       <loc>${SITEMAPS_URL_LOCATION}${SITEMAP_STATIC_FILE_NAME}</loc>
    </sitemap>
    <sitemap>
       <loc>${SITEMAPS_URL_LOCATION}${SITEMAP_SONGS_FILE_NAME}</loc>
    </sitemap>
    </sitemapindex>`;
}

function getSitemapStatic() {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://momotabs.com</loc>
        <changefreq>hourly</changefreq>
    </url>
    <url>
        <loc>https://momotabs.com/terms-of-service</loc>
    </url>
    <url>
        <loc>https://momotabs.com/privacy-policy</loc>
    </url>
    <url>
        <loc>https://momotabs.com/signin</loc>
    </url>
    </urlset>`;
}

async function getSitemapSongs() {
    const sitemapSongBlocks = await getSongSitemapBlocks();
    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sitemapSongBlocks.join("")}
    </urlset>`;
}

async function getSongSitemapBlocks() {
    const songIds = await getAllSongIds();
    const songUrls = songIds.map(getUrlForSongId);
    return songUrls.map(getSitemapUrlBlock);
}

function getSitemapUrlBlock(url: string) {
    return `
    <url>
        <loc>${url}</loc>
    </url>`;
}

function getUrlForSongId(songId: string) {
    return `https://momotabs.com/songs/${songId}`;
}

function getAllSongIds() {
    return FIREBASE_STORE.collection("songs")
        .get()
        .then(querySnapshot => {
            return querySnapshot.docs.map(doc => doc.id);
        })
        .catch((reason: any) => console.error(`[DataService] Failed to get all song IDs. ${reason}`));
}

console.log("Starting...");
execute();
