import {
  Photon,
  QuizItemType,
} from '../src/functions/graphql/.generated/photon';

async function main(): Promise<void> {
  const photon = new Photon();

  await photon.users.create({
    data: {
      email: 'john.doe@example.com',
      passwordHash:
        // bcrypt('123456')
        '$2b$10$gw5TKMoIbK8qlEmYUFJjf.327cZjk3PfHFWqW2gUQNywi4GpWo2i6',
      quizzes: {
        create: [
          {
            title: 'Mathematics Quiz',
            items: {
              create: [
                {
                  type: QuizItemType.MULTIPLE_OPTIONS,
                  stem:
                    'A popular method for solving systems of linear equations works one of these objects into reduced "row-echelon form." If one of these objects is square, its trace is simply the sum of values along a diagonal, and these mathematical arrangements have an inverse if and only if their determinant is not zero.',
                  t_MultipleOptions: {
                    create: {
                      constraints_maxCount: 1,
                      options: {
                        create: [
                          { text: 'matrix', isSolution: true },
                          { text: 'vector' },
                          { text: 'relation' },
                        ],
                      },
                    },
                  },
                },

                {
                  type: QuizItemType.MULTIPLE_OPTIONS,
                  stem: '|x| = 1\nx = ?',
                  t_MultipleOptions: {
                    create: {
                      constraints_minCount: 2,
                      constraints_maxCount: 2,
                      options: {
                        create: [
                          { text: '-2' },
                          { text: '-1', isSolution: true },
                          { text: '0' },
                          { text: '1', isSolution: true },
                          { text: '2' },
                        ],
                      },
                    },
                  },
                },

                {
                  type: QuizItemType.NUMERIC,
                  stem: '-x = 3.14\nx = ?',
                  t_Numeric: {
                    create: {
                      precision: 2,
                      solution: 3.14,
                    },
                  },
                },

                {
                  type: QuizItemType.MULTIPLE_OPTIONS,
                  stem:
                    "These values exist at a function's critical points when the function is concave down.",
                  t_MultipleOptions: {
                    create: {
                      constraints_maxCount: 1,
                      options: {
                        create: [
                          { text: 'minimum' },
                          { text: 'maximum', isSolution: true },
                        ],
                      },
                    },
                  },
                },
              ],
            },
          },

          {
            title: 'History Quiz',
            items: {
              create: [
                {
                  type: QuizItemType.NUMERIC,
                  stem:
                    'In which year was the city of Budapest officially created?',
                  t_Numeric: {
                    create: {
                      solution: 1873,
                    },
                  },
                },

                {
                  type: QuizItemType.MULTIPLE_OPTIONS,
                  stem:
                    'Which political faction represented the rich middle class during the French Revolution?',
                  t_MultipleOptions: {
                    create: {
                      constraints_maxCount: 1,
                      options: {
                        create: [
                          { text: 'Jacobins' },
                          { text: 'Girondists', isSolution: true },
                          { text: 'Loyalists' },
                        ],
                      },
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  await photon.disconnect();
}

main();