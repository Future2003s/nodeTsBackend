"use strict";

import { z } from "zod";

const managerFile = z.object({
  image: z.string()
});

// type TypeManagerFile = z.infer<>;
