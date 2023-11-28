# OZE Calculator 🔢

### This project contains three distinct calcualtors combined under a single domain
- photovoltaic,
- photovoltaic for Companys,
- heat pumps


<br/>
<br/>


~ It was designed to speed up the work of
sales professionals within the renewable energy sector. These
calculators serve as basic tools for estimating installation costs of
various renewable energy sources. 


<br/>
<br/>

 ### 📖 The project was built using the:
- T3 stack ( trpc, React, Tanstack-Query, Next-Auth, Prisma, zustand as state menegment, TailwindCSS )
- Vercel,
- AWS S3 Bucket / Planetscale

Data storage was divided into two services. AWS s3 bucket to store
the file with data necessary for calculations. Planetscale for user data.

<br/>
<br/>

## 🧖🏽 Entire web application is split between 3 roles:
### Admin:
  - create/remove menagers and salesmans,
  - change prices of each element,
  - change the imposed commission for menagers and salesmans,
  - post fresh news into /aktualnosci subpage,
  - use calculators, generates offers for clients
### Menager:
  - create/remove salesmans that works underneath him,
  - change the imposed commission for his salesmans,
  - use calculators, generates offers for clients
### Salesman:
   - use calculators, generates offers for clients



<br/>
<br/>

## What I've learned
First of all I've learned work with commercial client and fit to his requirments. For sure I've refined knowledge in React, app optymalizations, write code in clean way, split components into reusable, smaller pieces, read friendly folder structure, pass props between functions, zustand is another state menager I've come to know. 
Trpc was used rather schematicly but in readable and clean way. I've mastered the basics on AWS s3 bucket scope, that's why gathering data there will no be the problem no more, despite not friendly UI/UX entire platform.

<br/>
<br/>

## 🎨 Colors 

| Color           | Hex                                                                  |
| --------------- | -------------------------------------------------------------------- |
| Brand Color     | ![#FEEB1A](https://via.placeholder.com/15/FEEB1A/FEEB1A.png) #FEEB1A |
| Dark Color      | ![#303030](https://via.placeholder.com/15/303030/303030.png) #303030 |
| Red Color       | ![#FE4A49](https://via.placeholder.com/15/FE4A49/FE4A49.png) #FE4A49 |
| Background Color     | ![#E8E7E7](https://via.placeholder.com/15/E8E7E7/E8E7E7.png) #E8E7E7 |


<br/>
<br/>

<img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f31f/512.gif" alt="🌟" width="32" height="32">

Leave a star if you like it 


