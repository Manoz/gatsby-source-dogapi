<h1 align="center"> gatsby-source-dogapi </h1> <br>
<p align="center">
  <img src="https://i.imgur.com/f6kudBC.png" alt="gatsby-source-dogapi" />
</p>

<p align="center">
  The doggy source plugin you'll love.
</p>

## 🐕 Introduction

**gatsby-source-dogapi** is a simple Gatsby source plugin to add [thedogapi.com](https://thedogapi.com) doggy features to your Gatsby website. 

This source plugin lack of features right now but you can use it to play with the API and get random dog pictures. I'll add more options as soon as I can.

## Prerequisites

The Dog API is a free service and you can play with it without the needs for an API key.

However if you want to play with more datas, you'll need to signup [here](https://thedogapi.com/signup) and get your API key ready for the next steps.

## ☕️ Installation Guide

1. Install [Gatsby](https://next.gatsbyjs.org/docs/)
2. Install the plugin using `yarn add -D gatsby-source-dogapi` or `npm i -D gatsby-source-dogapi`
3. Configure the plugin in `gatsby-config.js` file:

```javascript
module.exports = {
  siteMetadata: {
    title: 'Wow! Such site! Very title',
  },
  plugins: [
    {
      resolve: "gatsby-source-dogapi",
      options: {
        "limit": 10,
        "page": 0,
        "order": "DESC",
        "x-api-key": "YOUR_API_KEY",
      },
    },
    'gatsby-plugin-offline',
  ],
}
```

## 📖 Usage

This source plugin supports all options present within the Dog API but **you can only get images** for now. Here's the options you can use:

| **Option**        | **Default**       | **Description**                                                                                |
| ----------------- | ----------------- | ---------------------------------------------------------------------------------------------- |
| limit             | 1                 | [Optional] number of images to return valid 1 to 10                                            |
| page              | 0                 | [Optional] only works if account_id is present to page through your own uploads                |
| order             | DESC              | [Optional] only works if account_id is present, either ASC or DESC - ascending or descending   |
| x-api-key         | null              | [Optional] your API key (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)                                 |

Get more documentation about The Dog API [here](https://documenter.getpostman.com/view/4016432/the-dog-api/RW81vZ4Z#intro).

## How to Query

**To query 10 random images:**

```
{
  allDogApiPic {
    edges {
      node {
        id
        url
        sub_id
        created_at
        original_filename
      }
    }
  }
}
```

**To query 1 random image:**
```
{
  allDogApiPic(limit: 1) {
    edges {
      node {
        id
        url
        sub_id
        created_at
        original_filename
      }
    }
  }
}
```

Example output:

```json
{
  "data": {
    "allDogApiPic": {
      "edges": [
        {
          "node": {
            "id": "22ae1251-42f1-55b7-835a-77b59115b76c",
            "url": "https://cdn2.thedogapi.com/images/Skx45T6EQ.gif",
            "sub_id": "tumblr_o6kk05nXYJ1tlb56zo1_400.gif",
            "created_at": "2018-07-31T11:38:15.000Z",
            "original_filename": "tumblr_o6kk05nXYJ1tlb56zo1_400.gif"
          }
        }
      ]
    }
  }
}
```

Here's a [link to your localhost query](http://localhost:8000/___graphql?query={%0A%20%20allDogApiPic%20{%0A%20%20%20%20edges%20{%0A%20%20%20%20%20%20node%20{%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%20%20sub_id%0A%20%20%20%20%20%20%20%20created_at%0A%20%20%20%20%20%20%20%20original_filename%0A%20%20%20%20%20%20}%0A%20%20%20%20}%0A%20%20}%0A}%0A).

# License
Released under the [MIT](./LICENSE) license.
