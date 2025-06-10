-   Cài đặt

```bash
npm install
```

or

```bash
npm i
```

### 1. Tạo dự án Node.js

```bash
npm init -y
```

### 2. Thêm TypeScript

```bash
npm install typescript --save-dev
```

### 3. Cài đặt kiểu dữ liệu TypeScript cho Node.js

```bash
npm install @types/node --save-dev
```

### 4. Cài đặt các package config cần thiết còn lại

```bash
npm install eslint prettier eslint-config-prettier eslint-plugin-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser ts-node tsc-alias tsconfig-paths rimraf nodemon --save-dev
```

### 5. Cấu hình tsconfig.json

-   tsconfig.json

```bash
{
  "compilerOptions": {
    "module": "NodeNext", // Quy định output module được sử dụng
    "moduleResolution": "NodeNext",
    "target": "ES2022", // Target output cho code
    "outDir": "dist", // Đường dẫn output cho thư mục build
    "esModuleInterop": true,
    "strict": true /* Enable all strict type-checking options. */,
    "skipLibCheck": true /* Skip type checking all .d.ts files. */,
    "baseUrl": ".", // Đường dẫn base cho các import
    "paths": {
      "~/*": ["src/*"] // Đường dẫn tương đối cho các import (alias)
    }
  },
  "ts-node": {
    "require": ["tsconfig-paths/register"]
  },
  "files": ["src/type.d.ts"], // Các file dùng để defined global type cho dự án
  "include": ["src/**/*"] // Đường dẫn include cho các file cần build
}
```

### 6. Cấu hình file config cho ESLint

.eslintrc

```bash
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "prettier"],
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "eslint-config-prettier", "prettier"],
  "rules": {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "prettier/prettier": [
      "warn",
      {
        "arrowParens": "always",
        "semi": false,
        "trailingComma": "none",
        "tabWidth": 2,
        "endOfLine": "auto",
        "useTabs": false,
        "singleQuote": true,
        "printWidth": 120,
        "jsxSingleQuote": true
      }
    ]
  }
}
```

### 7. Tiếp theo tạo file .eslintignore để ignore các file không cần kiểm tra lỗi

```bash
node_modules/
dist/
```

### 8. Cấu hình file config cho Prettier

.prettierrc

```bash
{
  "arrowParens": "always",
  "semi": false,
  "trailingComma": "none",
  "tabWidth": 2,
  "endOfLine": "auto",
  "useTabs": false,
  "singleQuote": true,
  "printWidth": 120,
  "jsxSingleQuote": true
}
```

### 9. Tạo file .prettierignore ở thư mục root

-   **_.prettierignore_**

```bash
node_modules/
dist/
```

### 10. Tạo file .editorconfig ở thư mục root

-   **_.editorconfig_**

```bash
[*]
indent_size = 2
indent_style = space
```

### 11. Tạo file .gitignore ở thư mục root

-   **_.gitignore_**

```bash
node_modules/
dist/
```

### 12. Tạo file nodemon.json ở thư mục root

Mục đích là cấu hình nodemon để tự động restart server khi có sự thay đổi trong code

-   **_nodemon.json_**

```bash
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "npx ts-node ./src/index.ts"
}
```

### 13. Mở file package.json lên, thêm đoạn script này vào

```bash
  "scripts": {
    "dev": "npx nodemon",
    "build": "rimraf ./dist && tsc && tsc-alias",
    "start": "node dist/index.js",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "prettier": "prettier --check .",
    "prettier:fix": "prettier --write ."
  }
```
