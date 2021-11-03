<?php

namespace App\Controller;
header('Access-Control-Allow-Origin: *');

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class SchoolController extends AbstractController
{
    /**
     * @Route("/school", name="school")
     */
    public function findAllPersons(){
        $em = $this->getDoctrine()->getManager();

        $query = $em->createQuery('SELECT p.id, p.name, p.street, p.created, p.updated, p.status FROM App:School p');
        $listPersons = $query ->getResult();

        $data = [
            'status' => 404,
            'message' => 'No se encontraron resultados'
        ];

        if(count($listPersons) > 0){
            $data = [
            'status' => 200,
            'message' => 'Se encontraron: ' . count($listPersons) . ' resultados',
            'listPersons' => $listPersons
            ];
        }
        return new JsonResponse($data);
    }
    

    public function createPerson(Request $request){
        $em = $this->getDoctrine()->getManager();


        $name = $request->get('name',null);
        $street = $request->get('street',null);
        $created = new \DateTime('now', new \DateTimeZone('America/Mexico_City'));  

            $school = new \App\Entity\School();

            $school->setName($name);
            $school->setStreet($street);
            $school->setCreated($created);
            $school->setStatus(1);
            
            $em->persist($school);
            $em->flush();

            $data = [
                'status'=> 200,
                'message' => 'Se ha creado correctamente',
                'person' => $school
            ];
        return new JsonResponse($data);
    }


    public function findById($id){
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery('SELECT p.id, p.name, p.street, p.created, p.updated, p.status FROM App:School p where p.id = :p');
        $query -> setParameter(':p',$id);
        $school = $query -> getResult();

        $data = [
            'status'=> 200,
            'message' => 'Se encontro el producto',
            'person' => $school
        ];
        return new JsonResponse($data);
    }

    public function updatePerson(Request $request, $id){
        $em = $this->getDoctrine()->getManager();


        $name = $request->get('name',null);
        $street = $request->get('street',null);
        $updated = new \DateTime('now', new \DateTimeZone('America/Mexico_City'));  

        $query =  $em->createQuery('UPDATE App:School p set p.name = :name, p.street = :street, p.updated = :updated
                                        WHERE p.id = :id');
        $query->setParameter(':name',$name);
        $query->setParameter(':street',$street);
        $query->setParameter(':updated',$updated);
        $query->setParameter(':id',$id);
        $flag = $query->getResult();

        if($flag == 1){
            $data = [
                'status' => 200,
                'message' => 'Se ha actualizado correctamente',
            ];
        }else{
            $data = [
                'status' => 404,
                'message' => 'Hubo un error',
            ];
        }
    return new JsonResponse($data);
    }

    public function delete_person($id){
        $em = $this->getDoctrine()->getManager();

        $query =  $em->createQuery('UPDATE App:School p set p.status = 0 WHERE p.id = :id');
        $query->setParameter(':id', $id);
        $school = $query->getResult();

        $data = [
            'status' => 200,
            'message' => 'Se ha deshabilitado correctamente',
            'school' => $school
        ];

        return new JsonResponse($data);
    }


}
