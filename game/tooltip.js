function Button(pos, txt) {
	this.clicked;

	this.update = function (dt) {
		return;
	}
	
	this.draw = function () {
		return;
	}

	this.mouseover = function (e) {
		return;
	}

	this.mouseout = function (e) {
		return;
	}
}


function ToolTip(basetile, attr) {
	var p = basetile.tPos;

	//Make new tPos and offset it
	this.tPos = new TemporalPos(p.x, p.y, p.w, p.h, 0, 0);
	this.tPos.x += TILE_SIZE-2;
	this.tPos.w = 110;
	this.tPos.h = 80;


	this.baseTile = basetile;

	this.hover = true;
	this.visibility = 1;
	

	this.base = new BaseObj(this, 13);

	this.update = function(dt) {
		if (this.hover == false) {
			this.visibility -= 3*dt;

			if (this.visibility < 0) {
				this.base.parent.base.removeObject(this);
			}
		}

		return;
	}	
	
	this.draw = function(pen) {
		pen.save();
		pen.fillStyle = "rgba(255,255,255," + this.visibility + ")";
		pen.strokeStyle = "rgba(255,0,0," + this.visibility + ")";
		//pen.strokeStyle = "lightblue";
		ink.rect(this.tPos.x, this.tPos.y, this.tPos.w, this.tPos.h, pen);        

		//Make the text
		pen.font = "10px courier";
		pen.fillStyle = "rgba(9,120,101," + this.visibility + ")";
		var counter = 0;
		var txt = "";
		for (i in attr) {
			txt = i + ": " + Math.round(attr[i] * 10) / 10;
			ink.text(this.tPos.x+2, this.tPos.y+10+counter, txt, pen);
			counter += 10;
		}

		//txt = "vis: " + this.visibility;
		//ink.text(this.tPos.x+2, this.tPos.y+90+counter, txt, pen);




		pen.restore();
		return;
	}

	this.mouseover = function (e) {
		this.hover = true;
		this.visibility = 1;
		return;
	}

	this.mouseout = function (e) {
		this.hover = false;
		
		return;
	}
}

