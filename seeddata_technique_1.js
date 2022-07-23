(async function() {
    const mysql = require('./src/config/mysql');
   

    const createParentBrandChildProductRecords = async ({brandId,brandName,products}) => {
        console.log('\x1b[36m%s\x1b[0m','createParentBrandChildProductRecords method is running.')
        /**
         * createParentBrandChildProductRecords function argument uses named args with destructuring technique
         */
       

        const connection = await mysql.connection();
        try {
            await connection.query('START TRANSACTION');
            console.log('>>>Creating parent brand record ', brandName);
            const results = await connection.query(`INSERT INTO brands(brand_id,brand_name)
      VALUES (?,?);`, [brandId,brandName]);
            const newBrandId = results.insertId;
            let index=0;
            for(index=0;index<products.length;index++){
                let { productId,productName} = products[index];
                console.log('>>>Creating child product record ', productName);
                let results = await connection.query(`INSERT IGNORE  INTO products(product_id,product_name,brand_id)
                VALUES (?,?,?);`, [productId,productName, newBrandId]);
            }
            await connection.query('COMMIT');
            return;
        } catch (err) {
            await connection.query('ROLLBACK');
            throw err;
        } finally {
            await connection.release();
        }
    }//End of createParentBrandChildProductRecords  method    

const data =[
{brandId:1,
brandName:'BRAND A',
products:[
  {productId:1,productName:'PRODUCT A.1'},
  {productId:2,productName:'PRODUCT A.2'},
  {productId:3,productName:'PRODUCT A.3'}
]},
{brandId:2,
    brandName:'BRAND B',
    products:[
        {productId:4,productName:'PRODUCT B.1'},
        {productId:5,productName:'PRODUCT B.2'},
        {productId:6,productName:'PRODUCT B.3'}
      ]},

    {brandId:3,
        brandName:'BRAND C',
        products:[
            {productId:7,productName:'PRODUCT C.1'},
            {productId:8,productName:'PRODUCT C.2'},
            {productId:9,productName:'PRODUCT C.3'}
          ]}
]              
console.time('mysql');
     for(index=0;index<data.length;index++){
        console.log('Creating brand and product parent child record data');
        await createParentBrandChildProductRecords(data[index]);
    }
console.timeEnd('mysql');
    process.exit();
})();