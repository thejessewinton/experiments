import { CandidateLevel, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const j1 = await prisma.user.upsert({
    where: { email: "jesse@jesse1.com" },
    update: {},
    create: {
      email: "jesse@jesse1.com",
      name: "Jesse 1",
      candidacy: {
        create: {
          github_url: "https://githu.com",
          job_title: "Software Engineer",
          salary: 100000,
          year_of_experience: 2,
          frameworks: {
            create: {
              name: "Next.js",
            },
          },
          languages: {
            create: {
              language: "TypeScript",
            },
          },
          level: CandidateLevel.SENIOR,
        },
      },
    },
  });
  const j2 = await prisma.user.upsert({
    where: { email: "jesse@jesse2.com" },
    update: {},
    create: {
      email: "jesse@jesse2.com",
      name: "Jesse 2",
      candidacy: {
        create: {
          github_url: "https://githu.com",
          job_title: "Software Engineer",
          salary: 100000,
          year_of_experience: 2,
          frameworks: {
            create: {
              name: "Next.js",
            },
          },
          languages: {
            create: {
              language: "TypeScript",
            },
          },
          level: CandidateLevel.SENIOR,
        },
      },
    },
  });
  const j3 = await prisma.user.upsert({
    where: { email: "jesse@jesse3.com" },
    update: {},
    create: {
      email: "jesse@jesse3.com",
      name: "Jesse 3",
      candidacy: {
        create: {
          github_url: "https://githu.com",
          job_title: "Software Engineer",
          salary: 100000,
          year_of_experience: 2,
          frameworks: {
            create: {
              name: "Next.js",
            },
          },
          languages: {
            create: {
              language: "TypeScript",
            },
          },
          level: CandidateLevel.SENIOR,
        },
      },
    },
  });
  const j4 = await prisma.user.upsert({
    where: { email: "jesse@jesse4.com" },
    update: {},
    create: {
      email: "jesse@jesse4.com",
      name: "Jesse 4",
      candidacy: {
        create: {
          github_url: "https://githu.com",
          job_title: "Software Engineer",
          salary: 100000,
          year_of_experience: 2,
          frameworks: {
            create: {
              name: "Next.js",
            },
          },
          languages: {
            create: {
              language: "TypeScript",
            },
          },
          level: CandidateLevel.SENIOR,
        },
      },
    },
  });

  console.log({ j1, j2, j3, j4 });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
