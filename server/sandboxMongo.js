db.createCollection('users', {
validator: {
	$jsonSchema: {
	bsonType: 'object',
	required: ['firstName', 'lastName', 'email'],
	properties: {
		firstName: {
			bsonType: 'string'
        },
		lastName: {
			bsonType: 'string'
        },
        email: {
			bsonType: 'string'
        },
        birthday: {
			bsonType: 'date'
        },
        address: {
			bsonType: 'object',
			required: ['city', 'street'],
			properties: {
				city: {
					bsonType: 'string'
                },
				street: {
					bsonType: 'string'  
                }
            }
        }
    }
    }
}
})


db.createCollection('products', {
validator: {
	$jsonSchema: {
	bsonType: 'object',
	required: ['name', 'price', 'manufacturerId'],
	properties: {
		name: {
			bsonType: 'string'
        },
		price: {
			bsonType: 'double'
        },
        amount: {
			bsonType: 'int'
        },
        expiredDate: {
			bsonType: 'date'
        },
		manufacturerId: {
			bsonType: 'objectId'
		}
    }
    }
}
})

db.products.insertOne({
	name: 'Baton',
	price: 18.9,
	manufacturerId: new ObjectId('65145e5848c4485efacb3f03')
})

db.products.aggregate([
	{
		$lookup:
		{
		  from: 'manufactures',
		  localField: 'manufacturerId',
		  foreignField: '_id',
		  as: 'manufacturer'
		}
	},
	{
		$unwind: {
			path: '$manufacturer'
		}
	},
	{
		$unset: 'manufacturerId'   
	},
	{
		$group: {
			_id: '$manufacturer.name',
			countPosition: {
				$count: {}
			}
		}
	}
])

// $unset - массив если несколько

db.products.find({}).skip(2).limit(2)

db.createCollection('manufactures', {
	validator: {
		$jsonSchema: {
		bsonType: 'object',
		required: ['name'],
		properties: {
			name: {
				bsonType: 'string'
			},
			address: {
				bsonType: 'object',
				properties: {
					country: {
						bsonType: 'string'
					},
					city: {
						bsonType: 'string'
					}
				}
			}
		}
		}
	}
	})


db.manufactures.insertOne({
	name: 'Hlibzavod',
	address: {
		country: 'Ukraine',
		city: 'Kiev'
	}
})