from bson import ObjectId
from fastapi import APIRouter, Depends
from pymongo import collection
from dependencies.dependencies import get_todo_collection
from models.todos import Todo
from util.database import get_database
from schemas.schemas import list_serial
router = APIRouter()
@router.get("/")
async def get_todos(todoCollection: collection = Depends(get_todo_collection)):
    # collection_name = db["todo_collection"]
    todos = list_serial(todoCollection.find())
    return todos
@router.post("/")
async def post_todos(todo:Todo,todoCollection = Depends(get_todo_collection),):
    todoCollection.insert_one(dict(todo))
@router.delete("/{id}")
async def delete_todo(id:str,todoCollection = Depends(get_todo_collection)):
    todoCollection.find_one_and_delete({"_id":ObjectId(id)})