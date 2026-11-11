# MongoDB Atlas – New cluster setup

Use this when creating a new cluster because the old one is gone or not working. The site uses MongoDB only to store visits.

## 1. Create a new cluster

1. Go to [MongoDB Atlas](https://cloud.mongodb.com) and sign in.
2. **Create** or select a project, then **Build a Database**.
3. Choose **M0 Free** (or another tier).
4. Pick a cloud provider and region (e.g. AWS / Frankfurt).
5. Name the cluster (e.g. `Cluster0`) and click **Create**.

## 2. Database user

1. **Database Access** → **Add New Database User**.
2. Choose **Password** and set username + password (save them).
3. **Built-in Role**: `Read and write to any database` (or at least to `personal-site`).
4. **Add User**.

## 3. Network access

1. **Network Access** → **Add IP Address**.
2. For local dev: **Allow Access from Anywhere** (`0.0.0.0/0`).
3. For production, restrict to your server’s IP(s).
4. **Confirm**.

## 4. Get the connection string

1. **Database** → **Connect** on your cluster.
2. **Drivers** (or “Connect your application”).
3. Copy the URI. It looks like:
   ```text
   mongodb+srv://<username>:<password>@cluster0.XXXXX.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<username>` and `<password>` with your DB user (or leave placeholders and set them in env).

## 5. Configure the app

Create or edit `.env.local` in the project root:

```env
MONGODB_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@cluster0.XXXXX.mongodb.net/?retryWrites=true&w=majority
```

- Use the **exact** hostname from Atlas (e.g. `cluster0.xxxxx.mongodb.net`).
- If the password has special characters, [URL-encode](https://www.urlencoder.org/) them.

Restart the dev server after changing `.env.local`.

## 6. Visits

The visit logger ([pages/api/visit.ts](../pages/api/visit.ts)) writes one document per browser session to the `visitors` collection of the `personal-site` database. Atlas creates the database and the collection on the first write, so a new cluster needs nothing beyond the steps above.

The site's content is not in MongoDB: the pages and the sitemap read [public/projects.json](../public/projects.json) at build time.

## 7. Production

Set the same `MONGODB_URI` in the Vercel project settings and redeploy. The build doesn't connect to MongoDB; only the visit logger does, per request. If the cluster is paused, the site keeps working and visits are not recorded until it is resumed.
