class Link
{
    constructor(bodyA, bodyB)
    {
        //composite [r1,r2, r3,r4,r5,r6, fruit]
        var lastLink  = bodyA.body.bodies.length-2;

        this.link = Constraint.create({
           

            bodyA: bodyA.body.bodies[lastLink],
            bodyB: bodyB,
            length: -11,
            stiffness: 0.01

        });

        World.add(myWorld, this.link)
    }

    detach()
    {
        World.remove(myWorld, this.link)
    }
}