import express from 'express';
import logger from '../lib/logger';
const router = express.Router();
import { TypeService } from '../services/typeService';

/**
 * @swagger
 * /api/type:
 *  get:
 *      summary: Return all types
 *      tags: [Types]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: list of all types
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/type'
 *                                
 */

router.get('/', async (req, res) => {
    const types = await TypeService.getAll();
    return res.status(200).json(types);
});

/**
 * @swagger
 * /api/type/{id}:
 *  get:
 *      summary: Return type by id
 *      tags: [Types]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: type id
 *      responses:
 *          200:
 *              description: Type
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/type'
 *          404:
 *              description: Type not found
 *                                                               
 */

router.get('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const type = await TypeService.getById(id);
        if(type) return res.status(200).json(type);

        return res.status(404).send();
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/type:
 *  post:
 *      summary: Create a new type
 *      tags: [Types]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/typeToCreate'
 *      responses:
 *          200:
 *              description: Type created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/type'
 *          404:
 *              description: Object not found
 *                                
 */

router.post('/', async (req, res) => {
    const { body } = req;
    try{
        if(
            "name" in body && typeof body.name === "string"
        ){
            const type = await TypeService.create(body);
            return res.status(200).json(type);
        }
        return res.status(400).json({message: "Invalid request"});
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/type/{id}:
 *  put:
 *      summary: Updates type by id
 *      tags: [Types]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: type id
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/typeToUpdate'
 *      responses:
 *          200:
 *              description: Type updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/type'
 *          404:
 *              description: Type not found
 *                                
 */

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try{
        const type = await TypeService.update(id, body);
        if(type) return res.status(200).json(type);
        
        return res.status(404).send();
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/type/{id}:
 *  delete:
 *      summary: Deletes a type by id
 *      tags: [Types]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: type id
 *      responses:
 *          200:
 *              description: Type deleted
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *          404:
 *              description: type not found
 *                                
 */

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const user = await TypeService.delete(id);
        if(user) return res.status(200).json(user);
        
        return res.status(404).json();
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

module.exports = router;