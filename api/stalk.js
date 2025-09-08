// api/stalk.js
import TikTokScraper from 'tiktok-scraper-lite';

export default async function handler(req, res) {
  const { username } = req.query;
  if (!username) return res.status(400).json({ status: false, message: 'Username kosong' });

  try {
    let cleanUsername = username.replace(/^https?:\/\/(www\.)?tiktok.com\/@/, '').split('?')[0];
    const user = await TikTokScraper.getUserProfile(cleanUsername);

    res.status(200).json({
      status: true,
      profile: {
        nama: user.nickname,
        namaPengguna: user.username,
        deskripsiAkun: user.signature,
        followers: user.followerCount,
        following: user.followingCount,
        hearts: user.heartCount,
        videoCount: user.videoCount,
        verified: user.verified ? 'Verified' : 'Not Verified',
        accountType: user.private ? 'Private Account' : 'Public Account',
        created: user.createTime,
        linkAkun: `https://www.tiktok.com/@${cleanUsername}`,
        avatar: user.avatarLarger
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: 'Gagal fetch data TikTok' });
  }
}
