import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/smart-engine";

async function cleanupUserLogins() {
  console.log('--- 🧹 STARTING USER DATA CLEANUP ---');
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB Atlas...');

    const db = mongoose.connection.db;

    const uRes = await db.collection('users').deleteMany({});
    console.log(`✅ Deleted ${uRes.deletedCount} user accounts from 'users'.`);

    const jspRes = await db.collection('jobseekerprofiles').deleteMany({});
    console.log(`✅ Deleted ${jspRes.deletedCount} profiles from 'jobseekerprofiles'.`);

    const rpRes = await db.collection('recruiterprofiles').deleteMany({});
    console.log(`✅ Deleted ${rpRes.deletedCount} profiles from 'recruiterprofiles'.`);

    const appRes = await db.collection('applications').deleteMany({});
    console.log(`✅ Deleted ${appRes.deletedCount} records from 'applications'.`);

    const intRes = await db.collection('interviews').deleteMany({});
    console.log(`✅ Deleted ${intRes.deletedCount} records from 'interviews'.`);

    console.log('--- 🎉 USER DATA CLEANUP COMPLETED SUCCESSFULLY ---');
  } catch (error) {
    console.error('❌ Cleanup error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

cleanupUserLogins();
