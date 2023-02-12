import { Person } from "@prisma/client";
import { z } from "zod";
import ZodPerson from "../../../types/person";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(configuration);

export const personRouter = createTRPCRouter({
  getConversationOpeners: publicProcedure
    .input(z.object({ prompt: z.string() }))
    .query(async ({ input }) => {
      return await openai.createCompletion({
        model: "text-davinci-003",
        prompt:
          "Given the following description about the user: " +
          input.prompt +
          ", provide a list of coffee chat or conversation questions that the user can ask the person. These should be in list format",
        temperature: 0,
        max_tokens: 7,
      });

      // return {
      //   greeting: `Hello ${input.person.prompt}`,
      // };
    }),
  add: publicProcedure
    .input(z.object({ person: ZodPerson }))
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const person: Person = await prisma.person.create({
        data: input.person,
      });

      const promptInfo = openai.createCompletion({
        model: "text-davinci-003",
        prompt:
          "Given the following description about the user: " +
          input.person.prompt +
          ", provide a list of coffee chat or conversation questions that the user can ask the person. These should be in list format",
        temperature: 0,
        max_tokens: 200,
      });

      return person;
      // return await openai.createCompletion({
      //   model: "text-davinci-003",
      //   prompt:
      //     "Given the following description about the user: " +
      //     input.person.prompt +
      //     ", provide a list of coffee chat or conversation questions that the user can ask the person. These should be in list format",
      //   temperature: 0,
      //   max_tokens: 7,
      // });
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.person.findMany();
  }),
});
